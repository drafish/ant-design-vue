import classnames from 'classnames';

import { ConfigConsumer } from '../config-provider';
import Breadcrumb from '../breadcrumb';
import Avatar from '../avatar';
import TransButton from '../_util/transButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

const PageHeader = {
  functional: true,
  render(h, ctx) {
    const renderBack = (prefixCls, backIcon, onBack) => {
      if (!backIcon || !onBack) {
        return null;
      }
      return (
        <LocaleReceiver componentName="PageHeader">
          {({ back }) => (
            <div class={`${prefixCls}-back`}>
              <TransButton
                onClick={e => {
                  if (onBack) {
                    onBack(e);
                  }
                }}
                className={`${prefixCls}-back-button`}
                aria-label={back}
              >
                {backIcon}
              </TransButton>
            </div>
          )}
        </LocaleReceiver>
      );
    };

    const renderBreadcrumb = breadcrumb => {
      return <Breadcrumb {...{ props: breadcrumb }} />;
    };

    const renderTitle = (prefixCls, props) => {
      const { title, avatar, subTitle, tags, extra, backIcon, onBack } = props;
      const headingPrefixCls = `${prefixCls}-heading`;
      if (title || subTitle || tags || extra) {
        const backIconDom = renderBack(prefixCls, backIcon, onBack);
        return (
          <div class={headingPrefixCls}>
            {backIconDom}
            {avatar && <Avatar {...avatar} />}
            {title && <span class={`${headingPrefixCls}-title`}>{title}</span>}
            {subTitle && <span class={`${headingPrefixCls}-sub-title`}>{subTitle}</span>}
            {tags && <span class={`${headingPrefixCls}-tags`}>{tags}</span>}
            {extra && <span class={`${headingPrefixCls}-extra`}>{extra}</span>}
          </div>
        );
      }
      return null;
    };

    const renderFooter = (prefixCls, footer) => {
      if (footer) {
        return <div class={`${prefixCls}-footer`}>{footer}</div>;
      }
      return null;
    };

    const renderChildren = (prefixCls, children) => {
      return <div class={`${prefixCls}-content`}>{children}</div>;
    };

    return (
      <ConfigConsumer>
        {({ getPrefixCls }) => {
          const {
            prefixCls: customizePrefixCls,
            style,
            footer,
            breadcrumb,
            className: customizeClassName,
          } = ctx.props;
          const { children } = ctx;

          const prefixCls = getPrefixCls('page-header', customizePrefixCls);
          const breadcrumbDom =
            breadcrumb && breadcrumb.routes ? renderBreadcrumb(breadcrumb) : null;
          const className = classnames(prefixCls, customizeClassName, {
            'has-breadcrumb': breadcrumbDom,
            'has-footer': footer,
          });

          return (
            <div class={className} style={style}>
              {breadcrumbDom}
              {renderTitle(prefixCls, ctx.props)}
              {children && renderChildren(prefixCls, children)}
              {renderFooter(prefixCls, footer)}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  },
};

export default PageHeader;
