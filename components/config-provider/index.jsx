import PropTypes from '../_util/vue-types';
import Base from '../base';
import defaultRenderEmpty from './renderEmpty';
import LocaleProvider from '../locale-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

export const ConfigConsumer = {
  name: 'AConfigConsumer',
  inject: {
    configData: { default: () => ({}) },
  },
  render() {
    const { $scopedSlots } = this;
    const children = $scopedSlots.default;
    return children(
      Object.assign(
        {
          // We provide a default function for Context without provider
          getPrefixCls: (suffixCls, customizePrefixCls) => {
            if (customizePrefixCls) return customizePrefixCls;

            return `ant-${suffixCls}`;
          },

          renderEmpty: defaultRenderEmpty,
        },
        this.configData,
      ),
    );
  },
};

const ConfigProvider = {
  name: 'AConfigProvider',
  props: {
    getPopupContainer: PropTypes.func,
    prefixCls: PropTypes.string,
    renderEmpty: PropTypes.object,
    csp: PropTypes.object,
    autoInsertSpaceInButton: PropTypes.boolean,
    locale: PropTypes.object,
  },
  provide() {
    return {
      configData: this.$props,
    };
  },
  methods: {
    getPrefixCls(suffixCls, customizePrefixCls) {
      const { prefixCls = 'ant' } = this.$props;

      if (customizePrefixCls) return customizePrefixCls;

      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
    },

    renderProvider(context, legacyLocale) {
      const { getPopupContainer, renderEmpty, csp, autoInsertSpaceInButton, locale } = this.$props;

      const children = this.$slots.default;

      const config = {
        ...context,
        getPrefixCls: this.getPrefixCls,
        csp,
        autoInsertSpaceInButton,
      };

      if (getPopupContainer) {
        config.getPopupContainer = getPopupContainer;
      }
      if (renderEmpty) {
        config.renderEmpty = renderEmpty;
      }

      return <LocaleProvider locale={locale || legacyLocale}>{children}</LocaleProvider>;
    },
  },

  render() {
    return (
      <LocaleReceiver>
        {(_, __, legacyLocale) => (
          <ConfigConsumer>{context => this.renderProvider(context, legacyLocale)}</ConfigConsumer>
        )}
      </LocaleReceiver>
    );
  },
};

/* istanbul ignore next */
ConfigProvider.install = function(Vue) {
  Vue.use(Base);
  Vue.component(ConfigProvider.name, ConfigProvider);
};

export default ConfigProvider;
