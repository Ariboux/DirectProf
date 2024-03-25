'use client';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import styles from './calendar.module.css';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Button from '../Button';
import toast from 'react-hot-toast';
import axios from 'axios';

interface CalendarProps {
    data: any;
    courseId: string;
}

export default function Calendar(
    { 
        data,
        courseId
    }: CalendarProps
) {
    const [DynamicScheduler, setDynamicScheduler] = useState<any>(() => null);
    const [modifiedEvents, setModifiedEvents] = useState<any[]>([]);
    const { theme } = useTheme();

    useEffect(() => {
        import('smart-webcomponents-react/scheduler').then(module => {
            setDynamicScheduler(() => module.Scheduler);
        });
    }, []);

    const finalSubmition = () => {
        axios.post(`/api/session/${courseId}`, modifiedEvents)
            .then(res => {
                console.log('res:', res);
                toast.success(`Event${modifiedEvents.length > 1 ? 's' : ''} saved successfully`);
            })
            .catch(err => {
                console.log('err:', err);
                toast.error(`Error adding event${modifiedEvents.length > 1 ? 's' : ''}`);
            });
    }

    const handleEventChange = (event: any) => {
        console.log('Event changed:', event);
        event = event.detail.item;
        const duration = event.dateEnd - event.dateStart;
        if (event.dateEnd - event.dateStart === 3600000) {
            // toast.success('Event added successfully');
            setModifiedEvents(events => [...events, event]);
        } else {
            toast.error('Event duration must be 1 hour, it will not be saved');
        }
    };

    const handleEventRemove = (event: any) => {
        console.log('Event removed:', event);
        setModifiedEvents(events => events.filter(e => e.label !== event.detail.item.label && e.dateStart !== event.detail.item.dateStart));
    };

    const handleEventUpdate = (event: any) => {
        console.log('Event updated:', event);
        setModifiedEvents(events => events.map(e => (e.id === event.id ? event : e)));
    }

    if (!DynamicScheduler) return <div>Loading...</div>;

    const today = new Date(),
        todayDate = today.getDate(),
        currentYear = today.getFullYear(),
        currentMonth = today.getMonth(),
        currentTimeIndicator = true,
        shadeUntilCurrentTime = true,
        view = 'week',
        views = ['day', 'week', 'month'],
        firstDayOfWeek = 1;

    return (
        <>
            <div className={styles.container}>
                <main className={styles.main}>
                    <DynamicScheduler
                        className={styles.scheduler}
                        id="scheduler"
                        currentTimeIndicator={currentTimeIndicator}
                        shadeUntilCurrentTime={shadeUntilCurrentTime}
                        view={view}
                        views={views}
                        firstDayOfWeek={firstDayOfWeek}
                        maxEventsPerCell={1}
                        locale="en"
                        dataSource={data}
                        colorScheme={[theme === 'dark' ? "000" : 'FFF']}
                        onItemInsert={handleEventChange}
                        onItemRemove={handleEventRemove}
                        //onItemChanging={handleEventUpdate}
                        hourStart={8}
                        hourEnd={20}
                    // S'occuper de lorsque l'user bouge un event
                    /*locale="fr"*/
                    />
                </main>
            </div>
            <div className='flex justify-center mt-5'>
                <Button
                    label="Save"
                    onClick={() => {
                        console.log('Modified events:', modifiedEvents);
                        finalSubmition();
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    }}
                    notLarge
                />
            </div>
        </>
    );
}
