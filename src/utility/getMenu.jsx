import React from 'react'

const menu = [
    {
        label: 'Home',
        to: '/home',
        roles: ['admin', 'student', 'management', 'staff']
    },
    {
        label: 'View Timetable',
        to: '/lecture',
        roles: ['student', 'staff']
    },
    {
        label: 'Edit Timetable',
        to: '/lecture',
        roles: ['admin']
    },
    {
        label: 'Master Data',
        to: '/master-data',
        roles: ['admin']
    },
    {
        label: 'Schedule Timetable',
        to: '/schedule-data',
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
        label: 'Add User',
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