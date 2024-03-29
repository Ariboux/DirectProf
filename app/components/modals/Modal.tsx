'use client';

import { use, useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { useTheme } from "next-themes";
import Draggable from 'react-draggable';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel: secondaryLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    const ref = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();    

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleClose();
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    });

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
            className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
            "
            >
                <div
                className="
                relative
                w-full
                md:w-4/6
                lg:w-3/6
                xl:w-2/5
                my-6
                mx-auto
                h-full
                lg:h-auto
                md:h-auto
                "
                >
                    <Draggable
                    handle="#draggable"
                    scale={1}
                    >
                    {/*content*/}
                    <div
                    ref={ref}
                    className={`
                    translate
                    duration-300
                    h-full
                    ${showModal ? 'translate-y-0' : 'translate-y-full'}
                    ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            handleClose();
                        }
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    
                    >
                        <div
                        className={`
                        translate
                        h-full
                        lg:h-auto
                        md:h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        w-full
                        ${theme==='dark'?'bg-[#1a202c]':'bg-white'}
                        outline-none
                        focus:outline-none
                        `}>
                            {/*header*/}
                            <div
                            id="draggable"
                            className={`
                            cursor-grab
                            select-none
                            flex
                            items-center
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            `}
                            >
                                <button
                                onClick={handleClose}
                                className={`
                                p-1
                                border-0
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                `}
                                >
                                    <IoMdClose size={18}/>
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {body}
                                </div>
                                {/*footer*/}
                                <div className="flex flex-col gap-2 p-6">
                                    <div
                                    className="
                                    flex
                                    flex-row
                                    items-center
                                    gap-4
                                    w-full
                                    "
                                    >
                                        {secondaryAction && secondaryLabel && (
                                            <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryLabel}
                                            onClick={handleSecondaryAction}
                                            />)}
                                        <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                        />
                                    </div>
                                    {footer}
                                </div>
                            </div>
                        </div>
                        </Draggable>

                    </div>
                </div>
        </>
    );
}

export default Modal;