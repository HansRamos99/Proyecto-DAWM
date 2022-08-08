const form_material = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
    return new mdc.textField.MDCTextField.attachTo(el);
});

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);


const banner = new MDCBanner(document.querySelector('.mdc-banner'));

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});