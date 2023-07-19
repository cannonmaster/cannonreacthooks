import useIsClient from "./isClient"

const TestUseIsClient = ()=>{
  const isClient = useIsClient()

  return (
    <div>{isClient ? "is client" : "is not client"}</div>
  )
}

export default TestUseIsClient;