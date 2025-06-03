import { Button, Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";

interface ModalBlockProps {
    btnLabel: string,
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined
}

const ModalBlock: React.FC<ModalBlockProps> = ({ btnLabel, size = '5xl' }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return(
        <>
            <Button onPress={onOpen}>{btnLabel}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}>
                <ModalContent>
                    <ModalBody></ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalBlock;