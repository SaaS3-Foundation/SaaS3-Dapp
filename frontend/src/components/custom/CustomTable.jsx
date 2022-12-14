import { StyledSemiTable } from '../styled/table';

export function CustomTable(props) {
  const {
    colums,
    dataSource,
    pagination,
    state,
    setState,
  } = props;

  return (
    <div>
      <StyledSemiTable pagination={pagination} columns={colums} dataSource={dataSource} />
    </div>
  );
}
