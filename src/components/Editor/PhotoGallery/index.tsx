"use client"

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

interface PhotoGalleryType {
    isOpen: boolean
    handleOpen: () => void
    callback: any
}

const PhotoGallery = ({ isOpen, handleOpen, callback }: PhotoGalleryType) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                size="xl"
                handler={handleOpen}
            >
                <DialogHeader>Your Gallery</DialogHeader>
                <DialogBody divider>
                    <h1>hello</h1>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => callback('https://images.pexels.com/photos/16884742/pexels-photo-16884742/free-photo-of-sea-flight-dawn-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', { alt: 'Hello everyone' })}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default PhotoGallery