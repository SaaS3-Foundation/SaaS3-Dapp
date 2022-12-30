import { Typography } from '@douyinfe/semi-ui';
import styled from 'styled-components';

const StyledTextBox = styled(Typography.Text)`
  flex: 1;
  padding: 6px 10px;
  background-color: rgba(57, 57, 57, 0.3);
  border-radius: 60px;
`;

function UrlPropsView(props) {
  const { data = {} } = props;
  return (
    <div className="">
      {!Object.keys(data).length && <Typography.Title heading={4} className="text-center">Empty</Typography.Title> }

      {Object.keys(data).map((key) => (
        <div className="flex gap-4 mt-2" key={key}>
          <StyledTextBox>{key}</StyledTextBox>
          <StyledTextBox>{data[key]}</StyledTextBox>
        </div>
      ))}

    </div>
  );
}

export default UrlPropsView;
