import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  href,
  onClick,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'btn-full-width',
    disabled && 'btn-disabled',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a 
        ref={ref}
        href={href}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {loading && <span className="btn-spinner"></span>}
        {children}
      </a>
    )
  }

  return (
    <button 
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button