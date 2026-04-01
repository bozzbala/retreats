const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const yargs = require('yargs');
const debounce = require('lodash.debounce');
const { optimize, loadConfig  } = require('svgo');

const iconsFolder = './src/icons/';
const widgetsFolder = './src/widgets/';
const tplWidgetsFolder = '@/widgets/';

const argv = yargs
  .option('watch', {
    alias: 'w',
    description: 'Watch source folders',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h').argv;

function iconsTemplate(filesContent) {
    const json = JSON.stringify(filesContent, null, "  ");
    return `// Этот файл генерируется автоматически, его не следует редактировать вручную\r\nexport default ${json};\r\n`;
}

updateIcons = debounce(async function () {
    const svgoConfig = await loadConfig("svgo.config.js");

    fs.readdir(iconsFolder, (err, files) => {
        const filesContent = files.reduce((result, file) => {
            if (path.parse(file).name == ".gitkeep") {
                return result;
            }

            const icon = path.parse(file).name;
            const content = fs.readFileSync(iconsFolder + file, 'utf8');
            result[icon] = optimize(content, svgoConfig).data;
            return result;
        }, {});
        
        const iconsContent = iconsTemplate(filesContent);
        
        fs.writeFile('./src/genIcons.js', iconsContent, err => {
            if (err) {
                console.error(err);
            } else {
                console.log(files.length + " icon(s) listed");
            }
        });
    });
}, 100);

function widgetsTemplate(files) {
    const imports = [];
    const nodes = [];
    let staticVueLoader = false;

    for (const file of files) {
        if (path.parse(file).name == ".gitkeep") {
            continue;
        }

        const widget = path.parse(file).name;
        const content = fs.readFileSync(widgetsFolder + file, 'utf8');
        const extname = path.extname(file)

        if (content && (content.includes("@widgetLoadingMode:lazy") || content.includes("@widgetLoadingMode:lazy-once"))) {
            const magickComments = {};

            const widgetLoadingMode = content.match(/@widgetLoadingMode:([0-9a-zA-Z_-]+)/);
            if (widgetLoadingMode) {
                magickComments.webpackMode = '"' + widgetLoadingMode[1] + '"';
            }

            const widgetLoadingChunk = content.match(/@widgetLoadingChunk:([0-9a-zA-Z_-]+)/);
            if (widgetLoadingChunk) {
                magickComments.webpackChunkName = '"' + widgetLoadingChunk[1] + '"';
            }

            const widgetLoadingPrefetch = content.match(/@widgetLoadingPrefetch:(true|false)/);
            if (widgetLoadingPrefetch) {
                magickComments.webpackPrefetch = widgetLoadingPrefetch[1];
            }

            const widgetLoadingPreload = content.match(/@widgetLoadingPreload:(true|false)/);
            if (widgetLoadingPrefetch) {
                magickComments.webpackPreload = widgetLoadingPreload[1];
            }

            const magickCommentsText = Object.entries(magickComments).map(function (entry) {
                return `/* ${entry[0]}: ${entry[1]} */`;
            }).join(" ");

            if (extname === ".js") {
            nodes.push(`  '${widget}': async () => await import( ${magickCommentsText} '${tplWidgetsFolder}${file}')` );
            } else if (extname === ".vue") {
                nodes.push(`  '${widget}': async () => { 
                    const componentPromise = import( ${magickCommentsText} '${tplWidgetsFolder}${file}'); 
                    const createVueWidgetPromise = import( /* webpackMode: "lazy-once" */ '@/core/createVueWidget.js'); 
                    const [component, createVueWidget] = await Promise.all([componentPromise, createVueWidgetPromise]);
                    return { default: (element, data) => createVueWidget.default(component.default, element, data) }; 
                }`);
            }
        } else {
            if (extname === ".js") {
            nodes.push(`  '${widget}': async () => { return { default: ${widget} }; }`);
            } else if (extname === ".vue") {
                if (!staticVueLoader) {
                    imports.push(`import createVueWidget from '@/core/createVueWidget.js';`);
                    staticVueLoader = true;
                }

                nodes.push(`  '${widget}': async () => { return { default: (element, data) => createVueWidget(${widget}, element, data) }; }`);
            }

            imports.push(`import ${widget} from '${tplWidgetsFolder}${file}';`);
        }
    }

    const importsCode = imports.join("\r\n");
    const nodesCode = nodes.join(",\r\n");

    /*
    const nodes = files.map((file) => {
        const widget = path.parse(file).name;
        return `  '${widget}': async () => await import('${tplWidgetsFolder}${file}')`
    }).join(",\r\n");
    */
    
    return `// Этот файл генерируется автоматически, его не следует редактировать вручную\r\n${importsCode}\r\n\r\nexport default {\r\n${nodesCode}\r\n};\r\n`;
}

updateWidgets = debounce(function () {
    fs.readdir(widgetsFolder, (err, files) => {
        const widgetsContent = widgetsTemplate(files);
        
        fs.writeFile('./src/genWidgets.js', widgetsContent, err => {
            if (err) {
                console.error(err);
            } else {
                console.log(files.length + " widget(s) listed");
            }
        });
    });
}, 100);

updateIcons();
updateWidgets();

if (argv.watch) {
    console.log("Watching...");

    chokidar.watch(widgetsFolder).on('add', (event, path) => {
        updateWidgets();
    }).on('unlink', (event, path) => {
        updateWidgets();
    }).on('change', function(path) {
        updateWidgets();
    })

    chokidar.watch(iconsFolder, {
        awaitWriteFinish: {
            stabilityThreshold: 500,
            pollInterval: 100
        },
    }).on('add', (event, path) => {
        updateIcons();
    }).on('unlink', (event, path) => {
        updateIcons();
    }).on('change', function(path) {
        updateIcons();
    })
}
