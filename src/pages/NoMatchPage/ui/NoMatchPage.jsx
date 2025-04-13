import styles from './NoMatchPage.module.scss'

export const NoMatchPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404: Page Not Found</h1>
      <p className={styles.description}>Sorry, the page youre looking for doesnt exist.</p>
    </main>
  )
}
