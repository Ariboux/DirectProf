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

interface EnrollCourseModalProps {
    course: Course | null;
    student: SafeUser | null;
    teacherName: string;
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
    teacherName
}) => {
    const router = useRouter();
    const enrollCourseModal = useEnrollCourseModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.RECAP);
    const { theme } = useTheme();
    const [dateSelect, setDate] = useState(new Date());
    
    if(!course || !student) {
        toast.error('An error occurred while enrolling the course.');
        return null;
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            studentId:'',
            date:''
            
        }
    });

    const date = watch('date');
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

        setIsLoading(true);

        axios.post('/api/enroll', data)
        .then((response) => {
            toast.success('Course enrolled successfully!');
            router.refresh();
            reset();
            setStep(STEPS.RECAP);
            // console.log(response.data);
            enrollCourseModal.onClose();
            router.push(`/courses/${response.data.id}`);
        })
        .catch((error) => {
            toast.error('An error occurred while creating the course.');
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        return step === STEPS.QUESTION ? 'Enroll' : 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        return step === STEPS.RECAP ? undefined : 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="Verify your course informations"
            subtitle={`Connected as ${student.name}`}
            />
            <div
            className="
            flex
            flex-row
            gap-8
            items-center
            justify-center
            border-2
            rounded-md
            py-3
            ">
                <tbody>
                    <tr
                    className="
                    w-full
                    flex
                    flex-row
                    gap-8
                    items-center
                    "
                    >
                        <td>
                        Course name
                        </td>
                        <td className="text-xl font-bold">
                            {course.title}
                        </td>
                    </tr>
                    <tr
                    className="
                    w-full
                    flex
                    flex-row
                    gap-8
                    items-center
                    "
                    >
                        <td>
                            Professor
                        </td>
                        <td className="text-xl font-bold">
                            {teacherName}
                        </td>
                    </tr>
                    <tr
                    className="
                    w-full
                    flex
                    flex-row
                    gap-8
                    items-center
                    "
                    >
                        <td>
                            Price
                        </td>
                        <td className="text-xl font-bold">
                            45€
                        </td>
                    </tr>
                </tbody>
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
                    onChange={(date) => setDate(date)}
                    />
                </div>
            </div>
        )
    }

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
                        label="7€"
                        selected={"7€" === watch('price')}
                        onClick={(value) => setCustomValue('price', value)}
                        />
                    </button>
                    <button key={course.id} className="col-span-1">
                        <SubjectButton
                        label="24€"
                        selected={"24€" === watch('price')}
                        onClick={(value) => setCustomValue('price', value)}
                        />
                    </button>
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
                {...register('questions')}
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