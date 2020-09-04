import { useRouter } from 'next/router'

const Trip = () => {
  const router = useRouter()
  const { slug } = router.query
  return <div>{slug}</div>
}

export default Trip
