import { Layout } from '@douyinfe/semi-ui';
import classNames from 'classnames';
import styled from 'styled-components';
import Header from '../header';
import bgVideo from '@/assets/videos/bg-video.mp4';

// import bgGif from '@/assets/imgs/bg-video.gif';
const StyledBgVideoWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  >video{
    width: 100%;
    /* height: 100%; */
  }
`;

// const bgCss = {
//   backgroundImage: `url(${bgGif})`,
//   backgroundAttachment: 'fixed',
//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
// };
function BaseLayout(props) {
  const { children, className, contentClassName } = props;
  return (
    <Layout className={classNames('h-screen', className)}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content className={classNames('bg-black/10 relative', contentClassName)}>
        {children}
      </Layout.Content>
      <StyledBgVideoWrap>
        <video
          autoPlay
          muted
          loop
          src={bgVideo}
        />
      </StyledBgVideoWrap>
    </Layout>
  );
}

export default BaseLayout;
