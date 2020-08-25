// const localeList = [
//   'af-ZA', 'ar', 'bg', 'ca', 'cs-CZ',
//   'da', 'de', 'ee', 'el', 'en', 'es',
//   'fa', 'fi', 'fr', 'he', 'hu', 'id',
//   'it', 'ja', 'ko', 'ku', 'kz', 'lt',
//   'lv', 'mn', 'nb-NO', 'nl', 'pl', 'pt-br',
//   'pt', 'ro', 'ru-RU', 'sk', 'sl', 'sv-SE',
//   'ta', 'th', 'tk', 'tr-TR', 'ua', 'ug-CN',
//   'vi', 'zh-CN', 'zh-TW',
// ];

module.exports = [
  {
    name: 'organization',
    type: 'confirm',
    message: 'Are you a member of the YiMian organization? There will be some special configurations',
    default: false,
  },
  {
    name: 'hamlet',
    type: 'confirm',
    message: 'Use vue-hamlet? Vue-hamlet is used as authentication for frontend',
    default: answers => answers.organization,
  },
  {
    name: 'normalize',
    type: 'confirm',
    message: 'Use normalize.css? Normalize.css is used to make browsers render all elements more consistently',
    default: false,
  },
  {
    name: 'ui',
    type: 'list',
    message: 'Confirm your UI framework',
    choices: [
      // {
      //   name: 'None',
      //   value: 'none',
      // },
      {
        name: 'Element, a Vue 2.0 based component library for developers, designers and product managers',
        value: 'element',
      },
      {
        name: 'Vuetify, Material Component Framework for Vue.js 2.0',
        value: 'vuetify',
      },
    ],
    default: 'element',
  },
  {
    name: 'import',
    type: 'list',
    message: answers => `How do you want to import ${answers.ui.charAt(0).toUpperCase() + answers.ui.slice(1)}?`,
    choices: [
      { name: 'Fully import', value: 'full' },
      { name: 'Import on demand', value: 'partial' },
    ],
    default: 'partial',
  },
  {
    when: answers => answers.ui === 'vuetify',
    name: 'iconFont',
    type: 'rawlist',
    message: 'Select icon font',
    choices: [
      'Material Icons (default)',
      'Material Design Icons',
      'Font Awesome 5',
      'Font Awesome 4',
    ],
    default: 0,
    filter(val) {
      return {
        'Material Icons (default)': 'md',
        'Material Design Icons': 'mdi',
        'Font Awesome 5': 'fa',
        'Font Awesome 4': 'fa4',
      }[val];
    },
  },
  {
    when: answers => answers.ui === 'vuetify',
    name: 'installFonts',
    type: 'confirm',
    message: 'Use fonts as a dependency (for Electron or offline)?',
    default: true,
  },
  {
    when: answers => answers.ui === 'vuetify',
    name: 'customTheme',
    type: 'confirm',
    message: 'Do you wish to overwrite Stylus variables?',
    default: true,
  },
  {
    name: 'i18n',
    type: 'list',
    message: 'Element i18n options',
    choices: [
      { name: 'None', value: 'none' },
      // { name: 'Standard', value: 'standard' },
      { name: 'VueI18n (with i18n cli plugin)', value: 'vuei18n' },
    ],
    default: 'vuei18n',
  },
  {
    name: 'moment',
    type: 'confirm',
    message: 'Use Moment (Parse, validate, manipulate, and display dates and times in JavaScript)?',
    default: true,
  },
  {
    name: 'ymSvgSprite',
    type: 'confirm',
    message: 'Use ym-svg-sprite? ym-svg-sprite is used to build svg sprite in vue',
    default: true,
  },
  {
    name: 'echarts',
    type: 'confirm',
    message: 'Use Echarts (A powerful, interactive charting and visualization library for browser)?',
    default: false,
  },
  // {
  //   when: answers => answers.i18n === 'vuei18n',
  //   name: 'vuei18nLocales',
  //   type: 'checkbox',
  //   message: "Select the locales you want to load (default values: 'zh-CN', 'en')",
  //   choices: localeList,
  //   default: [ 'zh-CN', 'en' ],
  // }
];
