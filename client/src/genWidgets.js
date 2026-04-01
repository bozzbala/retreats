// Этот файл генерируется автоматически, его не следует редактировать вручную
import autoheight from '@/widgets/autoheight.js';
import form from '@/widgets/form.js';
import globalEventButton from '@/widgets/globalEventButton.js';
import openByGlobalEvents from '@/widgets/openByGlobalEvents.js';
import scrollTop from '@/widgets/scrollTop.js';
import telField from '@/widgets/telField.js';

export default {
  'autoheight': async () => { return { default: autoheight }; },
  'collapse': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/collapse.js'),
  'expertsSlider': async () => await import( /* webpackMode: "lazy-once" */ '@/widgets/expertsSlider.js'),
  'form': async () => { return { default: form }; },
  'globalEventButton': async () => { return { default: globalEventButton }; },
  'openByGlobalEvents': async () => { return { default: openByGlobalEvents }; },
  'retreatDaySlider': async () => await import( /* webpackMode: "lazy-once" */ '@/widgets/retreatDaySlider.js'),
  'reviewsSlider': async () => await import( /* webpackMode: "lazy-once" */ '@/widgets/reviewsSlider.js'),
  'scrollTop': async () => { return { default: scrollTop }; },
  'tabsSwitch': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/tabsSwitch.js'),
  'telField': async () => { return { default: telField }; }
};
