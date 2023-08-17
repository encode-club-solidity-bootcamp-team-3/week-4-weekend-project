import styles from "./instructionsComponent.module.css";
import { TokenAddressFromApi } from "./TokenAddressFromApi";
import { WalletInfo } from "./WalletInfo";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>My App</h1>
        </div>
      </header>
      <div className={styles.get_started}>
        <WalletInfo />
        <TokenAddressFromApi />
      </div>
    </div>
  );
}