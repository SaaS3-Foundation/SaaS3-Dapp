import { getWallets } from '@talismn/connect-wallets';
import {
  Image, Notification, Toast, Typography,
} from '@douyinfe/semi-ui';
import { IconChevronRight } from '@douyinfe/semi-icons';
import { RoundItemLink } from './styled';

function SelectWallet(props) {
  const { onSelect } = props;

  return (
    <>
      {
        getWallets().map((wallet) => (
          <RoundItemLink
            key={wallet.title}
            onClick={async () => {
              if (!wallet.installed) {
                return window.open(wallet.installUrl);
              }
              try {
                await wallet.enable('SaaS3-Dapp');
                onSelect(wallet);
              } catch (error) {
                if (error.message && error.message.includes('is not allowed to interact with this extension')) {
                  return Notification.error({
                    title: 'Failed to connect to wallet',
                    content: 'Please go to the Wallet app settings to allowed',
                  });
                }
                Toast.error('Failed to connect to wallet.');
              }
            }}
          >
            <Image width={36} height={36} src={wallet.logo.src} alt={wallet.logo.alt} preview={false} />
            <Typography.Text className="ml-4">{wallet.title}</Typography.Text>
            <div className="ml-auto flex items-center">
              {wallet.installed ? (
                <IconChevronRight className="text-lg " />
              ) : (
                <div className="flex items-center">
                  <Typography.Text className="border border-[#D2D2D2] rounded-full px-4 py-1">
                    Install
                  </Typography.Text>
                </div>
              )}

            </div>
          </RoundItemLink>
        ))
      }
    </>
  );
}

export default SelectWallet;
