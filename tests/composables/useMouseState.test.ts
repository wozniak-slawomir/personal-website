import { useMouseState } from '~/composables/useMouseState'

describe('useMouseState', () => {
  it('should initialize with isMouseEntered as false', () => {
    const { isMouseEntered, setMouseEntered } = useMouseState()
    
    expect(isMouseEntered.value).toBe(false)
    expect(typeof setMouseEntered).toBe('function')
  })

  it('should update isMouseEntered when setMouseEntered is called', () => {
    const { isMouseEntered, setMouseEntered } = useMouseState()
    
    // Initially false
    expect(isMouseEntered.value).toBe(false)
    
    // Set to true
    setMouseEntered(true)
    expect(isMouseEntered.value).toBe(true)
    
    // Set back to false
    setMouseEntered(false)
    expect(isMouseEntered.value).toBe(false)
  })

  it('should return readonly isMouseEntered ref', () => {
    const { isMouseEntered } = useMouseState()
    
    // Try to directly assign to the ref (should not work)
    expect(() => {
      // @ts-ignore - Testing readonly behavior
      isMouseEntered.value = true
    }).toThrow()
  })

  it('should create independent instances', () => {
    const instance1 = useMouseState()
    const instance2 = useMouseState()
    
    // Both should start as false
    expect(instance1.isMouseEntered.value).toBe(false)
    expect(instance2.isMouseEntered.value).toBe(false)
    
    // Changing one should not affect the other
    instance1.setMouseEntered(true)
    expect(instance1.isMouseEntered.value).toBe(true)
    expect(instance2.isMouseEntered.value).toBe(false)
    
    instance2.setMouseEntered(true)
    expect(instance1.isMouseEntered.value).toBe(true)
    expect(instance2.isMouseEntered.value).toBe(true)
  })
})