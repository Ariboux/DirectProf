// @ts-nocheck
'use client';

import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import styles from './calendar.module.css';
import { useEffect, useState } from 'react';

export default function Calendar() {
    const [DynamicScheduler, setDynamicScheduler] = useState<any>(() => null); // Initialize with a function

    useEffect(() => {
        // Load the Smart.Scheduler component dynamically only in the browser
        import('smart-webcomponents-react/scheduler').then(module => {
            setDynamicScheduler(() => module.Scheduler); // Use module.Scheduler to access the Scheduler component
        });
    }, []);

    // Return loading state if the component is not yet loaded
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
                />
            </main>
        </div>
    );
}