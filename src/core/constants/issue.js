const issueTypes = [
    {
        value: 'bug',
        label: 'Bug',
    },
    {
        value: 'task',
        label: 'Task',
    },
    {
        value: 'story',
        label: 'Story',
    },
];

const priority = [
    {
        value: 'high',
        label: 'High'
    },
    {
        value: 'highest',
        label: 'Highest'
    },
    {
        value: 'medium',
        label: 'Medium'
    },
    {
        value: 'low',
        label: 'Low'
    },
    {
        value: 'lowest',
        label: 'Lowest'
    }
];

const taskStatus = { 
    TODO: 'Todo',
    IN_PROGRESS: 'InProgress',
    TEST: 'Test',
    DONE: 'Done'
}

export {
    issueTypes, priority, taskStatus
}

