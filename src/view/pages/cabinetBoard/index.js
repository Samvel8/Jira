import { useEffect, useContext, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { db, updateDoc, doc } from '../../../services/firebase/firebase';
import LoadingWrapper from '../../components/shared/LoadingWrapper';
import { Typography, Flex } from 'antd';
import { AuthContext } from '../../../context/AuthContext';
import EditIssueModal from '../../components/shared/EditIssueModal';
import { ISSUE_OPTION, PRIORITY_OPTION } from '../../../core/constants/issue';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../state-managment/reducers/issuesSlice';
import './index.css';

const { Title, Text } = Typography;


const CabinetBoard = () => {
    const { issuesLoading, setColumns } = useContext(AuthContext)
    const [ selectedIssueData, setSelectedIssueData ] = useState(null);
    const dispatch = useDispatch();

    const columns = useSelector(state => state.issues.issueColumns);

    useEffect(() => {
        dispatch(fetchData());
    },[])
    const handleDragEnd = result => {
        const { source, destination } = result;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];

        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items]; 

        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        if (source.droppableId !== destination.droppableId) {
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            })
        } else {
            const sourceColumn = columns[source.droppableId];
            const sourceColumnItems = sourceColumn.items;
            const [removed] = sourceColumnItems.splice(source.index, 1);
            sourceColumnItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceColumnItems
                }
            })
        }
    };                      

    const handleChangeTaskStatus = async result => { 
        if (result.destination) {
            try{
                handleDragEnd(result);
                const { destination: { droppableId, index }, draggableId } = result;

                const docRef = doc(db, 'issue', draggableId);
                await updateDoc(docRef, {
                    status: droppableId,
                    index
                });
            }catch {
                console.log('error')
            }
        }
    }

    return (
        <div className="drag_context_container">
        <LoadingWrapper loading={issuesLoading}>
                <DragDropContext onDragEnd={handleChangeTaskStatus}>
                    {
                        Object.entries(columns).map(([columnId, column]) => {
                            return (
                                <div className="column_container" key={columnId}>
                                <div className="column_header">
                                        <Title level={5} type="secondary">
                                            {column.name}
                                            {' '}
                                            {column.items.length}
                                        </Title>
                                </div>

                                    <div>
                                        <Droppable droppableId={columnId} key={columnId}> 
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="droppable_container"
                                                        style={{
                                                            backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#f4f5f7'
                                                        }}
                                                    >
                                                        {
                                                            column.items.map((item, index) => {
                                                                return (
                                                                    <Draggable 
                                                                        key={item.key}
                                                                        draggableId={item.key} 
                                                                        index={index} 
                                                                       
                                                                    >
                                                                        {
                                                                            (provided, snapshot) => {
                                                                                return (
                                                                                    <div
                                                                                        onClick={() => setSelectedIssueData(item)}
                                                                                        className="issue_card_container"
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        style={{
                                                                                            backgroundColor: snapshot.isDragging ?  '#ebecf0' : '#fff',
                                                                                            ...provided.draggableProps.style,
                                                                                        }}
                                                                                    >
                                                                                        <Text>
                                                                                            {item.shortSummary}
                                                                                        </Text>

                                                                                        <Flex justify="space-between">
                                                                                            <div>
                                                                                                {ISSUE_OPTION[item.issueType].icon}
                                                                                                {' '}
                                                                                                {PRIORITY_OPTION[item.priority].icon}
                                                                                            </div>

                                                                                            <div>

                                                                                            </div>
                                                                                        </Flex>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Draggable>
                                                                )
                                        
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }}
                                        </Droppable>
                                    </div>
                                </div>
                            )
                        })
                    }
                </DragDropContext>
            </LoadingWrapper>

            {
                Boolean(selectedIssueData) && (
                    <EditIssueModal 
                        issueData={selectedIssueData}
                        visible={Boolean(selectedIssueData)}
                        onClose={() => setSelectedIssueData(null)}
                    />
                )
            }
      
        </div>
    )
};

export default CabinetBoard;
