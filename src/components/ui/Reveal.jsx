import { useInView } from '../../hooks/useInView'

const hidden = {
  up: 'translate-y-6 opacity-0',
  scale: 'scale-[0.96] opacity-0',
  left: 'translate-x-8 opacity-0',
  right: '-translate-x-8 opacity-0',
}

const shown = {
  up: 'translate-y-0 opacity-100',
  scale: 'scale-100 opacity-100',
  left: 'translate-x-0 opacity-100',
  right: 'translate-x-0 opacity-100',
}

function Reveal({ children, className = '', delay = 0, variant = 'up' }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      data-inview={inView ? '' : undefined}
      className={`transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? shown[variant] || shown.up : hidden[variant] || hidden.up
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
