import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MovingSquare } from '../components/MovingSquare/movingSquare'

describe('Testing movingsquare component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <MovingSquare
        squareWidth={20}
        squareHeight={20}
        color={'#EB4769'}
        canvasWidth={700}
        canvasHeight={800}
      />
    )
  })
  it('should match screenshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('shoud intial state positionx 0', () => {
    expect(wrapper.state().positionX).toEqual(0)
  })
  it('shoud intial state positionx y', () => {
    expect(wrapper.state().positionY).toEqual(0)
  })
  it('shoud intial state coordinatex', () => {
    expect(wrapper.state().coordinateX).toEqual(0)
  })
  it('shoud intial state coordinate y ', () => {
    expect(wrapper.state().coordinateY).toEqual(0)
  })

  it('should increment 10px with keydown right', () => {
    const instance = wrapper.instance()
    spyOn(instance, 'moveToRight').and.callThrough()
    instance.moveToRight()
    expect(wrapper.state().positionX).toEqual(10)
  })

  it('should left position X on 0 when initial value is 0  with keydown left', () => {
    const instance = wrapper.instance()
    spyOn(instance, 'moveToLeft').and.callThrough()
    instance.moveToLeft()
    expect(wrapper.state().positionX).toEqual(0)
  })
  it('should decrea 10px with keydown left when value is greater 0', () => {
    const instance = wrapper.instance()
    spyOn(instance, 'moveToRight').and.callThrough()
    instance.moveToRight()
    instance.moveToRight()
    instance.moveToRight()
    instance.moveToRight()
    spyOn(instance, 'moveToLeft').and.callThrough()
    instance.moveToLeft()
    expect(wrapper.state().positionX).toEqual(30)
  })
  it('should increment 10px y position with keydown down', () => {
    const instance = wrapper.instance()
    spyOn(instance, 'moveToDown').and.callThrough()
    instance.moveToDown()
    expect(wrapper.state().positionY).toEqual(10)
  })
  it('should left position Y on 0 when initial value is 0  with keydown up', () => {
    const instance = wrapper.instance()
    spyOn(instance, 'moveToUp').and.callThrough()
    instance.moveToUp()
    expect(wrapper.state().positionY).toEqual(0)
  })
  it('should decrease 10px y position with keydown up', () => {
    const instance = wrapper.instance()
    spyOn(instance, 'moveToDown').and.callThrough()
    instance.moveToDown()
    instance.moveToDown()
    instance.moveToDown()
    instance.moveToDown()
    spyOn(instance, 'moveToUp').and.callThrough()
    instance.moveToUp()
    expect(wrapper.state().positionY).toEqual(30)
  })
})
