import './proto.css'
import MobileApp from './proto1/MobileApp'
import MobileApp2 from './proto2/MobileApp2'

export default function ProtoRouter({ proto }) {
  if (proto === '2') return <MobileApp2 />
  return <MobileApp />
}
