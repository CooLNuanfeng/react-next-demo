"use client";
import { usePokemon, usePokPostemon } from '@/service/api'
import styles from "./page.module.scss";

export default function DashBoard() {
  // get
  // const { data, size, setSize } = usePokemon()

  //post
  const { data, size, setSize } = usePokPostemon()
  if (!data) return 'loading'
  console.log(data)
  const list = data ? [].concat(...data.map(item => item.list)) : []
 
  // const list = data ? [].concat(...data) : [];
  console.log('list==>',list)

  const handleScroll = (event:any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log("scroll", scrollTop, clientHeight, scrollHeight);
    if(scrollTop + clientHeight >= scrollHeight) {
      console.log("到底了")
      setSize(size + 1)
    }
  }

  return (
    <div className={styles.main} style={{ height: '100vh', overflowY: 'scroll'}} onScroll={handleScroll}>
      {/* <p>{totalUsers} users listed</p> */}
      <ul>
        { list?.map((user:any, index: number) => <li key={index}>{user.name}</li>) }
      </ul>
    </div>
  )
}