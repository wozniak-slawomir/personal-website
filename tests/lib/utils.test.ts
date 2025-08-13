import { cn, valueUpdater } from '~/lib/utils'
import { ref } from 'vue'

describe('lib/utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('base-class', 'additional-class')
      expect(result).toContain('base-class')
      expect(result).toContain('additional-class')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toContain('base-class')
      expect(result).toContain('active-class')
    })

    it('should handle false conditions', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class')
    })

    it('should handle arrays and objects', () => {
      const result = cn(['class1', 'class2'], { 'class3': true, 'class4': false })
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
      expect(result).not.toContain('class4')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'class')
      expect(result).toContain('base')
      expect(result).toContain('class')
    })
  })

  describe('valueUpdater function', () => {
    it('should update ref with direct value', () => {
      const testRef = ref('initial')
      valueUpdater('updated', testRef)
      expect(testRef.value).toBe('updated')
    })

    it('should update ref with function updater', () => {
      const testRef = ref(5)
      const updaterFn = (current: number) => current * 2
      valueUpdater(updaterFn, testRef)
      expect(testRef.value).toBe(10)
    })

    it('should handle object values', () => {
      const testRef = ref({ count: 1 })
      const updaterFn = (current: { count: number }) => ({ count: current.count + 1 })
      valueUpdater(updaterFn, testRef)
      expect(testRef.value.count).toBe(2)
    })

    it('should handle boolean values', () => {
      const testRef = ref(false)
      valueUpdater(true, testRef)
      expect(testRef.value).toBe(true)
      
      const toggleFn = (current: boolean) => !current
      valueUpdater(toggleFn, testRef)
      expect(testRef.value).toBe(false)
    })

    it('should handle array values', () => {
      const testRef = ref([1, 2, 3])
      const updaterFn = (current: number[]) => [...current, 4]
      valueUpdater(updaterFn, testRef)
      expect(testRef.value).toEqual([1, 2, 3, 4])
    })

    it('should handle string transformations', () => {
      const testRef = ref('hello')
      const upperCaseFn = (current: string) => current.toUpperCase()
      valueUpdater(upperCaseFn, testRef)
      expect(testRef.value).toBe('HELLO')
    })
  })
})