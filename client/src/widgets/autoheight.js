export default function (element, data) {
    adjustHeight(element);
    
    element.addEventListener('input', function() {
      adjustHeight(this);
    });
    
    function adjustHeight(element) {
      element.style.height = '';
      if (element.value != '') {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight + 1) + 'px';
      }
    }
}
