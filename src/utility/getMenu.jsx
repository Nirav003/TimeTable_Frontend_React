import React from 'react'

const menu = [
    {
        label: 'Home',
        to: '/home',
        roles: ['admin', 'student', 'management', 'staff']
    },
    {
        label: 'Lecture',
        to: '/lecture',
        roles: ['admin', 'student', 'staff']
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
    },
    {
        label: 'Users',
        to: '/users',
        roles: ['admin']
    },
    {
        label: 'SignUp',
        to: '/signup',
        roles: ['admin']
    }
]

const getMenu = (role) => {
    return (  
        menu.filter(menuItem => menuItem.roles.includes(role))
    )
}

export default getMenu;