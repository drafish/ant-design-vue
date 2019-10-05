import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';

const defaultEmptyImg = {
  functional: true,
  render() {
    return <DefaultEmptyImg />;
  },
};
const simpleEmptyImg = {
  functional: true,
  render() {
    return <SimpleEmptyImg />;
  },
};

const Empty = {
  functional: true,
  render(h, ctx) {
    return (
      <ConfigConsumer>
        {({ getPrefixCls }) => {
          const {
            className,
            prefixCls: customizePrefixCls,
            image = defaultEmptyImg,
            description,
            imageStyle,
            ...restProps
          } = ctx.props;

          const { children } = ctx;

          return (
            <LocaleReceiver componentName="Empty">
              {locale => {
                const prefixCls = getPrefixCls('empty', customizePrefixCls);
                const des = typeof description !== 'undefined' ? description : locale.description;
                const alt = typeof des === 'string' ? des : 'empty';

                let imageNode = null;

                if (typeof image === 'string') {
                  imageNode = <img alt={alt} src={image} />;
                } else {
                  imageNode = image;
                }

                return (
                  <div
                    class={classNames(
                      prefixCls,
                      {
                        [`${prefixCls}-normal`]: image === simpleEmptyImg,
                      },
                      className,
                    )}
                    {...{ props: restProps }}
                  >
                    <div class={`${prefixCls}-image`} style={imageStyle}>
                      {imageNode}
                    </div>
                    {des && <p class={`${prefixCls}-description`}>{des}</p>}
                    {children && <div class={`${prefixCls}-footer`}>{children}</div>}
                  </div>
                );
              }}
            </LocaleReceiver>
          );
        }}
      </ConfigConsumer>
    );
  },
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
