import { useState, useEffect } from 'react'
import './App.css'

const operations: Array<number | string> = ['C', '+/-', '%', '+', 1, 2, 3, '-', 4, 5, 6, '*', 7, 8, 9, '/', 0, '.', '='];
const getOperationItemBgColor = (operation: number | string) => {
  if (typeof operation === 'string') {
    if (['C', '+/-', '%'].includes(operation)) {
      return 'bg-gray-600'
    }
    if (['+', '-', '*', '/', '='].includes(operation)) {
      return 'bg-yellow-400'
    }
  }

  return 'bg-gray-800'
}

let calculation: number = 0
let hasCalculation: boolean = false
let lastOperation: number | string = ''
let lastCalculateSymbol: string = ''

function App() {
  const [displayingValue, setDisplayingValue] = useState<number | string>(0)

  const clear = () => {
    calculation = 0
    hasCalculation = false
    setDisplayingValue(0)
  }

  const togglePositiveAndNegative = () => {
    if (hasCalculation) {
      calculation = calculation * -1
    }
    setDisplayingValue(+displayingValue * -1)
  }

  const convertToPercentage = () => {
    if (hasCalculation) {
      calculation = calculation / 100
    }
    setDisplayingValue(+displayingValue / 100)
  }

  const handleClickCalculateSymbol = (operation: string) => {
    const currValue = +displayingValue
    if (hasCalculation && typeof lastOperation === 'number') {
      switch (lastCalculateSymbol) {
        case '+':
          calculation += currValue
          break
        case '-':
          calculation -= currValue
          break
        case '*':
          calculation *= currValue
          break
        case '/':
          calculation /= currValue
          break
        default:
      }
      setDisplayingValue(calculation)
    }

    if (!hasCalculation) {
      calculation = currValue
    }

    hasCalculation = true
    lastCalculateSymbol = operation
  }

  const handleClickOperation = (operation: number | string) => {
    if (operation === '.') {
      // 为小数的时候不能再添加小数点了
      if (String(displayingValue).indexOf('.') === -1) {
        setDisplayingValue(displayingValue + '.')
      }
    }

    if (typeof operation === 'number') {
      if (typeof lastOperation === 'number' || lastOperation === '.') {
        const value: string = String(displayingValue) + operation;
        setDisplayingValue(value)
      } else {
        setDisplayingValue(operation)
      }
    }

    switch (operation) {
      case 'C':
        clear()
        break
      case '+/-':
        togglePositiveAndNegative()
        break
      case '%':
        convertToPercentage()
        break
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleClickCalculateSymbol(operation)
      default:
    }

    lastOperation = operation
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white">
      <div className="flex flex-[3] flex-nowrap justify-end p-[12px] items-end h-[200px] text-6xl">
        { displayingValue }
      </div>
      <div className="p-4 grid grid-cols-4 gap-4 flex-[7] text-3xl pb-[18px]">
        {
          operations.map((operation) => (
            <div
              key={operation}
              className={`
                flex justify-center items-center
                rounded-full
                ${ operation === 0 ? 'col-span-2' : ''}
                ${ getOperationItemBgColor(operation) }
              `}
              onClick={() => handleClickOperation(operation)}
            >
              { operation }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
