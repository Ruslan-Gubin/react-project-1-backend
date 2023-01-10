

const timeout = (callback: () => void, delay:number) => {
  const tick = () => callback()
   const timer =   setTimeout( tick, delay)
  return () => clearTimeout(timer)
}

export {timeout}