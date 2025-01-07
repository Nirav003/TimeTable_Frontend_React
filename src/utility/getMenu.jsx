const menu = [
    {
        label: 'Home',
        to: '/home',
        roles: ['admin', 'student', 'management', 'staff']
    },
    {
        label: 'Lecture',
        to: '/lecture',
        roles: ['admin', 'student', 'management', 'staff']
    },
    {
        label: 'Master Data',
        to: '/master-data',
        roles: ['admin']
    },
    {
        label: 'Mapping',
        to: '/mapping',
        roles: ['admin']        
    },
    {
        label: 'Committee Members',
        to: '/CommitteeMembers',
        roles: ['management']
    }
]

import React from 'react'

const getMenu = (role) => {
    return (  
        menu.filter(menuItem => menuItem.roles.includes(role))
    )
}

export default getMenu;