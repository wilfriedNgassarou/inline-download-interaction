import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

function App() {
  const [state, setState] = useState<'idle' | 'downloading' | 'downloaded'>('idle')

  return (
    <section className="w-full h-dvh relative flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {state != 'downloaded' && (
          <motion.button 
            key="btn1"
            layoutId="button"
            onClick={() => {
              if(state != 'idle') return 

              setState('downloading')
            }}
            className="h-10 w-40 flex justify-center items-center bg-black text-white"
            style={{ borderRadius: 20 }}
          >
            {state == 'idle' && ( 
              <motion.span 
                key="span"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Download
              </motion.span>
            )}
            {state == 'downloading' && (
              <div
                key="progress-wrapper" 
                className="h-1 w-32 rounded-full overflow-hidden bg-white/40"
              >
                <motion.div
                  key="progress"
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  onAnimationComplete={() => {
                    setState('downloaded')

                    setTimeout(() => {
                      setState('idle')
                    }, 1500);
                  }}
                  transition={{ duration: 1.5, delay: .1, type: 'tween', ease: 'easeInOut' }}
                />
              </div>
            )}
          </motion.button>
        )}
        {state == 'downloaded' && (
          <motion.div
            key="btn2" 
            layoutId="button"
            className="bg-black h-10 w-10 flex justify-center items-center"
            style={{ borderRadius: 20 }}
          >
            <motion.svg
              key="svg"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: .4 }}
              width="24"
              height="24"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default App
