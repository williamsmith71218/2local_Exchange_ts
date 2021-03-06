import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { useIndacoinCheckoutModalOpen, useIndacoinCheckoutModalToggle } from '../../state/application/hooks'


export default function IndacoinCheckoutModal() {
	const indacoinCheckoutModalOpen = useIndacoinCheckoutModalOpen()
	const indacoinCheckoutModalToggle = useIndacoinCheckoutModalToggle()

	return (
		<Modal isOpen={indacoinCheckoutModalOpen} onDismiss={indacoinCheckoutModalToggle} minHeight={51} maxHeight={400}>
			<iframe src="https://indacoin.com/partner-widget/?partner=2LC" title="Indacoin Checkout" />
		</Modal>
	)
}