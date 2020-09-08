import styles from '@/styles/Home.module.scss'
import Card from '@/components/Card/Card'

const HomePage = () => {
  return (
    <section className={styles.home_places}>
      <h2 className="center">Mest Populære Dykkersteder</h2>
      <Card type="highlight"></Card>
    </section>
  )
}

export default HomePage
