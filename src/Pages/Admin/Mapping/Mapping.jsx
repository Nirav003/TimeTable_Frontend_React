import React, { useState } from 'react'
import StreamSubjectMapping from './StreamSubjectMapping'
import ProfessorStreamMapping from './ProfessorStreamMapping'
import SelectFile from '../../../Components/Select File/SelectFile'

const Mapping = () => {

    const [ currentTab, setCurrentTab ] = useState('')

    const sideBar = [
        {
            id: 'professor-stream',
            label: 'Professor - Stream',
            component: <ProfessorStreamMapping />
        },
        {
            id: 'stream-subject',
            label: 'Stream - Subject',
            component: <StreamSubjectMapping />
        },
    ]

    return (
        <div className="flex max-w-screen mx-auto -translate-y-[6px] -translate-x-[16px]">
            <div className='w-1/5 px-5 mt-12'>
                <ul>
                    {
                        sideBar.map((item, i) => (
                            <li key={i} className={`mb-4 cursor-pointer ${currentTab === item.id ? 'underline underline-offset-2 decoration-2 decoration-primary-dark' : ''}`}>
                                <button 
                                    className="bg-offwhite-light w-full text-test2-3 text-center rounded-lg shadow-lg p-2 cursor-pointer" 
                                    onClick={() => setCurrentTab(item.id)}
                                >
                                    <h2 className="text-xl font-semibold">{item.label}</h2>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='my-8 translate-y-5 border-r-2 border-test2-2'></div>
            <div className='w-4/5 p-4'>
                <div className='p-4'>
                    {sideBar.find(item => item.id === currentTab)?.component || <SelectFile />}
                </div>
            </div>
        </div>
    )
}

export default Mapping