import type { DefaultsOptions } from 'vuetify';

const VMenu: VMenu = {
  offset: '16',
  contentClass: 'rounded-xl',
};

const defaults: DefaultsOptions = {
  VSheet: {
    class: 'text-center pa-sm-6 pa-4 mx-auto',
    rounded: 'xl',
  },
  VExpansionPanels: {
    rounded: 'xl',
  },
  VMenu,
  VAutocomplete: {
    menuProps: {
      ...VMenu,
    },
  },
};

export default defaults;
