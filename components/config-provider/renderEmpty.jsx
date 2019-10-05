import Empty from '../empty';
import { ConfigConsumer } from '.';

const renderEmpty = {
  functional: true,
  render(h, ctx) {
    const { componentName } = ctx.props;
    return (
      <ConfigConsumer>
        {({ getPrefixCls }) => {
          const prefix = getPrefixCls('empty');

          switch (componentName) {
            case 'Table':
            case 'List':
              return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

            case 'Select':
            case 'TreeSelect':
            case 'Cascader':
            case 'Transfer':
            case 'Mentions':
              return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={`${prefix}-small`} />;
            default:
              return <Empty />;
          }
        }}
      </ConfigConsumer>
    );
  },
};

export default renderEmpty;
