import React, { useState } from "react";
import DecisionSuccessResponse from "@/schema/up2tom-v3/manual-schema/DecisionSuccessResponse";
import OneButtonDialog, { DialogButtonType, OneButtonDialogProps } from "./OneButtonDialog";
import Model from "@/schema/up2tom-v3/manual-schema/Model";

interface DecisionDialogProps extends Omit<OneButtonDialogProps, 'children' | "title" | "onClick" | "stopShowingError" | "error"> {
	tomModel: Model;
	decision: DecisionSuccessResponse;
}

export default function DecisionDialog({ tomModel, decision: decisionSuccessResponse, buttonType, stopShowing, ...props }: DecisionDialogProps): JSX.Element {

	const { decision, "meets-confidence": meetsConfidence, confidence, reasons } = decisionSuccessResponse.attributes;

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [oneButtonError, setOneButtonError] = useState();

	function toggleDropdown() {
		setIsDropdownOpen(!isDropdownOpen);
	};

	function onButtonClick() {
		if (buttonType === DialogButtonType.Save) {
			console.log("upload decision to server");
		}
	}

	return (
		<OneButtonDialog
			{...props}
			onClick={onButtonClick}
			buttonType={buttonType}
			title="Decision:"
			stopShowing={stopShowing}
			error={oneButtonError}
			stopShowingError={() => setOneButtonError(undefined)}
		>
			<div className="p-4">
				<p><strong>{tomModel.attributes.name}: </strong>{decision}</p>
				<p><strong>Meets Confidence: </strong> {meetsConfidence ? "Yes" : "No"}</p>
				<p><strong>Confidence: </strong> {confidence}</p>
				{reasons && reasons.length > 0 && (
					<div className="mt-4">
						<button
							type="button"
							onClick={toggleDropdown}
							className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
						>
							{isDropdownOpen ? "Hide Reasons" : "Show Reasons"}
						</button>
						{isDropdownOpen && (
							<ul className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
								{reasons.map((reason, index) => (
									<li key={index} className="mb-2">
										<pre className="whitespace-pre-wrap">{JSON.stringify(reason, null, 2)}</pre>
									</li>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
		</OneButtonDialog>
	);
}