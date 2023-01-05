import { Typography } from '@douyinfe/semi-ui';
import { StyledSemiTable } from '@/components/styled/table';
import { ProfileContentWrap } from '../styled';
import { ReactComponent as PasteIcon } from '@/assets/imgs/svg/pasteIcon.svg';
import { omitText } from '@/utils/utils';

function ProfileTable({
  data = {}, columns = [], titleRender,
}) {
  return (
    <div>
      <div>{titleRender && titleRender()}</div>
      {columns.map((col, i) => (
        <div className="mt-4 text-sm flex justify-between items-center" key={i}>
          <div>
            <Typography.Title heading={6}>{col.title}</Typography.Title>
          </div>
          <div className="flex-1 ml-2 text-right">
            {col.render ? col.render(col, data, i) : (
              <div>  { omitText(data[col.dataIndex]) }  </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Table(props) {
  const {
    className, mobileColumns, dataSource = [], mobileTitleRender,
  } = props;
  return (
    <div className={className}>
      <div className="xmd:hidden">
        <ProfileContentWrap className="!pt-0">
          <StyledSemiTable {...props} />
        </ProfileContentWrap>
      </div>
      <div className="nmd:hidden">
        {dataSource.map((data, i) => (
          <ProfileContentWrap key={data.id || i}>
            <ProfileTable
              titleRender={() => mobileTitleRender && mobileTitleRender(data, i)}
              data={data}
              columns={mobileColumns}
            />
          </ProfileContentWrap>
        ))}
      </div>
    </div>
  );
}

export default Table;
