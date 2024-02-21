import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

import plusIcon from '../../images/plucIcon.svg'
import trashIcon from '../../images/trashIcon.svg'
import editIcon from '../../images/editIcon.svg'


import './relationNode.scss'
import { hover } from '@testing-library/user-event/dist/hover';

function RelationNode({ id, data }) {
    const { onDeleteNode, createNodeAndConnect, setZoomOnScroll, color, type } = data;

    const [renderedLabel, setRenderedLabel] = useState(data.Vid_svyaziey)

    const [colorBasedOnType, setColorBasedOnType] = useState('#9B8B7B')

    const [keys, setKeys] = useState(Object.keys(data))
    const [visibleKeys, setVisibleKeys] = useState(['data_nachalo', 'data_konca'])

    const [hoverState, setHoverState] = useState('')

    const [newLabel, setNewLabel] = useState('')
    const [newColor, setNewColor] = useState('')

    const [additionalText, setAdditionalText] = useState([])

    const addNewText = () => {
        setAdditionalText(currentArray => [...currentArray, ''])
    }

    const updateArrayItem = (index, newValue) => {
        setAdditionalText(currentArray => 
            currentArray.map((item, currentIndex) => 
                currentIndex === index ? newValue : item
            )    
        )
    }

    const handlePropertyChange = (x) => {
        setVisibleKeys(prevKeys => {
            if (prevKeys.includes(x)) {
                // Remove x from the array
                return prevKeys.filter(y => y !== x);
            } else {
                // Add x to the array
                return [...prevKeys, x];
            }
        });
    }
    const handleStyle = {
        width: '6px', // Increase the width
        height: '6px', // Increase the height
        background: '#555',
        zIndex: 10 // Ensure the handle is above other elements for interaction
    };

    return (
        <div className='relation-node' style={{backgroundColor: colorBasedOnType}}>
            <Handle
                type="source"
                position={Position.Top}
                style={handleStyle} // Apply the custom style
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div className="node-header">

                
                <textarea
                    className='rendered-label-input'
                    style={{ fontSize:'12px' }}
                    value={renderedLabel}
                    onInput={(e) => {
                    setRenderedLabel(e.target.value);
                    // Reset height to 'auto' to ensure the content dictates the size
                    e.target.style.height = 'auto';
                    // Set height to scrollHeight to accommodate all content
                    e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    spellCheck="false" // Disables the spellcheck feature
                    rows="1" // Ensures it starts with a single line
                />
            </div>




            <div className="node-body">
                {visibleKeys.map(x => {
                    if (data[x] != null && data[x] && data[x] != 'NULL') {
                        return (
                            <a>{x}: {data[x]}</a>
                        )
                    }
                })}
                {additionalText.map(x => {
                    return (
                        <a>{x}</a>
                    )
                })}
            </div>
            <Handle
                type="target"
                position={Position.Bottom}
                id="a"
                style={handleStyle} // Apply the custom style
            />
            <div className='node-tools-bar'>
                {hoverState == '' ? 
                    <>
                        <img src={editIcon} alt='edit' onClick={() => {
                            setZoomOnScroll(false)
                            setHoverState('edit')
                            }
                        }/>
                        <img src={plusIcon} alt='add'  onClick={() => setHoverState('add')}/>
                        <img src={trashIcon} alt='delete' onClick={() => onDeleteNode(id)}/>
                    </>
                    :
                    hoverState == 'edit' ? 
                    <div className='edit-node-properties' onMouseLeave={() => {
                            setZoomOnScroll(true)
                            setHoverState('')
                        }
                    }>
                        <h1>Показать поля</h1>
                        <div 
                            className="list-of-properties" 
                            
                            >
                            {keys.filter(x => !['label', 'Vid_svyaziey', 'Type', 'id', 'source', 'target', 'createNodeAndConnect', 'setZoomOnScroll', 'color', 'type', 'onDeleteNode'].includes(x)).map(x => {
                                if (data[x] != null && data[x] && data[x] != 'NULL')
                                return (
                                    <div className='prop-vision'>
                                        <input type="checkbox" onChange={() => handlePropertyChange(x)} name="" id="" checked={visibleKeys.includes(x)} />
                                        <a>{x}</a>
                                    </div>
                                )
                            })}

                        </div>
                        <div className='edit-node-additional'>
                            {additionalText.map((x, index) => {
                                return (
                                    <input value={x} onChange={(e) => updateArrayItem(index, e.target.value)}/>
                                )
                            })}
                        </div>
                        <div onClick={() => addNewText()} className='edit-node-footer'>
                            <img src={plusIcon} alt="+" />
                            <a>Добавить текст</a>
                        </div>
                    </div>
                    : hoverState == 'add' ? 
                    <div className='edit-node-properties'>
                        <h1>Добавить связь</h1>
                        <div className="inputs-for-node-create">
                            <div className="input-line">
                                <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} name="" id="" />
                                <label htmlFor="">Выберите цвет</label>
                            </div>
                            <div className="input-line">
                                <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} name="" id="" />
                                <label htmlFor="">Текст</label>
                            </div>
                        </div>
                        <div className='edit-node-footer'>
                            <button onClick={() => createNodeAndConnect(id, newLabel, newColor)}><a>Сохранить</a></button>
                            <button onClick={() => setHoverState('')}><a>Отменить</a></button>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    );
}

export default memo(RelationNode);