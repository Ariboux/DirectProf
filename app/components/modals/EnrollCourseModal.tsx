'use client';

import useEnrollCourseModal from "@/app/hooks/useEnrollCourseModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import SubjectButton from "../inputs/SubjectButton";
import { Course } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useTheme } from "next-themes";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface EnrollCourseModalProps {
    course: Course | null;
    student: SafeUser | null;
    teacherName: string;
    sessions: any;
}

enum STEPS {
    RECAP = 0,
    CALENDAR = 1,
    PRICE = 2,
    QUESTION = 3
}

const EnrollCourseModal: React.FC<EnrollCourseModalProps> = ({
    course,
    student,
    teacherName,
    sessions
}) => {
    const router = useRouter();
    const enrollCourseModal = useEnrollCourseModal();
    const [sessionsfiltered, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.RECAP);
    const { theme } = useTheme();
    const [dateSelect, setDate] = useState(new Date());

    const actionLabel = useMemo(() => {
        return step === STEPS.QUESTION ? 'Enroll' : 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        return step === STEPS.RECAP ? undefined : 'Back';
    }, [step]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            studentId: student?.id,
        }
    });

    if (!course || !student) {
        //toast.error('An error occurred while enrolling the course.');
        return null;
    }

    const session = watch('sessionSelected');
    const question = watch('question');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.QUESTION) {
            return onNext();
        }
        if (!data.sessionId) {
            return toast.error('Please select a session.');
        }
        if (!data.price) {
            return toast.error('Please enter a price.');
        }

        setIsLoading(true);
        console.log("sessionSelected", data);

        axios.post('/api/enroll', data)
            .then((response) => {
                toast.success('Course enrolled successfully!');
                router.refresh();
                reset();
                setStep(STEPS.RECAP);
                // console.log(response.data);
                enrollCourseModal.onClose();
                router.push(`/mycourses`);
                axios.post(`/api/mailEnroled/${student.email}`, data)
                    .then(() => {
                        toast.success("Email of confirmation sent successfully.");
                    })
            })
            .catch((error) => {
                toast.error('An error occurred while creating the course.');
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Verify your course information"
                subtitle={`Connected as ${student.name}`}
            />
            <div className="flex flex-col gap-8">
                <div className="border-2 rounded-md p-3">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="w-1/2 text-right pr-4">Course name:</td>
                                <td className="w-1/2 text-xl font-bold">{course.title}</td>
                            </tr>
                            <tr>
                                <td className="w-1/2 text-right pr-4">Professor:</td>
                                <td className="w-1/2 text-xl font-bold">{teacherName}</td>
                            </tr>
                            <tr>
                                <td className="w-1/2 text-right pr-4">Price:</td>
                                <td className="w-1/2 text-xl font-bold">{course.price?course.price+"€":"10€"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

    if (step === STEPS.CALENDAR) {

        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you want to take the course ?"
                    subtitle="Choose a date"
                />
                <div className="flex flex-row gap-8 items-center justify-center">
                    <Calendar
                        value={dateSelect}
                        onChange={(date) => {
                            setDate(date);
                            const filtered = sessions.filter((session: any) => session.dateStart.getDate() === date.getDate());
                            setSessions(filtered);
                        }}
                    />
                </div>
                {sessionsfiltered.map((session: any) => (
                    <div key={session.id} className="flex flex-row gap-4 items-center justify-center">
                        <Button
                            label={`${session.dateStart.getHours()}:00-${session.dateEnd.getHours()}:00: ${session.label}`}
                            onClick={() => setCustomValue('sessionId', session.id)}
                            small
                            notLarge
                            outline={session.id !== watch('sessionId')}
                        />
                    </div>
                ))}
            </div>
        )
    }
    const priceOrCustom = course.price ? course.price+"€" : "10€";

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="What tariff do you want to set ?"
                    subtitle="Choose a price"
                />
                <div
                    className="flex flex-row gap-12 items-center justify-center"
                >
                    <button key={course.id} className="col-span-1">
                        <SubjectButton
                            label={priceOrCustom}
                            selected={priceOrCustom === watch('price')}
                            onClick={(value) => setCustomValue('price', value)}
                        />
                    </button>
                    {/* <button key={course.id} className="col-span-1">
                        <SubjectButton
                            label="24€"
                            selected={"24€" === watch('price')}
                            onClick={(value) => setCustomValue('price', value)}
                        />
                    </button> */}
                </div>
            </div>
        )
    }

    if (step === STEPS.QUESTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Do you have any questions ?"
                    subtitle="Write them here to the teacher"
                />
                <textarea
                    {...register('question')}
                    className="w-full h-40 p-4 border-[1px] border-neutral-200 rounded-xl"
                    placeholder="Enter your questions here."
                />
            </div>
        )
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={enrollCourseModal.isOpen}
            title="Enroll a course"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step !== STEPS.RECAP ? onBack : undefined}
            onClose={enrollCourseModal.onClose}
            body={bodyContent}
        />
    )
}

export default EnrollCourseModal;