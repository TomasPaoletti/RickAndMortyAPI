import React from 'react'
import { Button } from 'react-bootstrap';

export default function ActionButtons({ children, variant, title, onClick }) {
    return (
        <Button
            className="m-1"
            variant={variant}
            title={title}
            size="sm"
            onClick={onClick}
        >
            {children}
        </Button>
    )
}