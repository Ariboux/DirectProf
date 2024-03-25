'use client';

import useCreateCourseModal from "@/app/hooks/useCreateCourseModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Search from "../navbar/Search";
import SubjectButton from "../inputs/SubjectButton";
import ImageUpload from "../inputs/ImageUpload";

interface CreateCourseModalProps {
    subjects: any[];
}

enum STEPS {
    CATEGORY = 0,
    DESCRIPTION = 1,
    IMAGE = 2,
    PRICE = 3,
    TAGS = 4
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
    subjects
    }) => {
    const router = useRouter();
    const createCourseModal = useCreateCourseModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            subject: '',
            title: '',
            description: '',
            image: '',
            price: '',
            // tags: []
        }
    });

    const title = watch('title');
    const subject = watch('subject');
    const description = watch('description');
    const image = watch('image');
    const price = watch('price');
    // const tags = watch('tags');

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
        if (step !== STEPS.TAGS) {
            return onNext();
        }
        if(!data.subject) {
            return toast.error('Please select a subject.');
        }
        if(!data.title) {
            return toast.error('Please enter a title.');
        }
        if(!data.price) {
            return toast.error('Please enter a price.');
        }

        setIsLoading(true);

        axios.post('/api/courses', data)
        .then((response) => {
            toast.success('Course created successfully!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            // console.log(response.data);
            createCourseModal.onClose();
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
        if (step === STEPS.TAGS) {
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="What subject does your course belong to?"
            subtitle="Pick a subject"
            />
            <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
            max-h-[50vh]
            overflow-y-auto
            justify-items-center
            ">
                {subjects.map((subject) => (
                    <button key={subject.id} className="col-span-1">
                        <SubjectButton
                        label={subject.name}
                        selected={subject.name === watch('subject')}
                        onClick={(value) => setCustomValue('subject', value)}
                        />
                    </button>
                    ))}
            </div>
        </div>
    )

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="What are the details of your course ?"
                subtitle="Describe your course"
                />
                <Input 
                id="title"
                label="Title"
                register={register}
                errors={errors}
                />
                <textarea
                {...register('description', {
                    required: 'Please enter a description for your course.'
                })}
                className="w-full h-64 p-4 border-[1px] border-neutral-200 rounded-xl"
                placeholder="Enter a description for your course."
                />
            </div>
        )
    }

    if (step === STEPS.IMAGE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="What is the cover image of your course ?"
                subtitle="Upload an image"
                />
                <ImageUpload
                value={image}
                onChange={(value) => setCustomValue('image', value)}
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="What is the price of your course ?"
                subtitle="Set a price"
                />
                <Input 
                id="price"
                label="Price"
                register={register}
                errors={errors}
                formatPrice
                />
            </div>
        )
    }

    if (step === STEPS.TAGS) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="What are the tags of your course ?"
                subtitle="Choose tags"
                />
                <Search />
            </div>
        )
    }

    return (
        <Modal
        disabled={isLoading}
        isOpen={createCourseModal.isOpen}
        title="Create a course"
        actionLabel={actionLabel}
        onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step !== STEPS.CATEGORY ? onBack : undefined}
        onClose={createCourseModal.onClose}
        body={bodyContent}
        />
    )
}

export default CreateCourseModal;