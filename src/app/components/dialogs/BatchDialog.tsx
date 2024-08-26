import React, { useState } from "react";
import OneButtonDialog, { DialogButtonType, OneButtonDialogProps } from "./OneButtonDialog";
import Model from "@/schema/up2tom-v3/manual-schema/Model";
import BatchFile from "@/schema/up2tom-v3/manual-schema/BatchFile";
import Job from "@/schema/up2tom-v3/manual-schema/Job";

interface BatchDialogProps extends Omit<OneButtonDialogProps, 'children' | "title" | "onClick" | "stopShowingError" | "error"> {
	tomModel: Model;
	batch: BatchFile | Job;
}

interface Batch { // unification of a Job and BatchFile
	filename: string;
	size: number;
	date: Date;
	progress: number;
	errors?: {
		type: "error";
		message: string;
		value: string;
	}[] | undefined
}

function getBatch(batch: BatchFile | Job): Batch {
	const batchFile = batch as BatchFile;
	if (batchFile.timestamp) return {
		filename: batch.filename,
		date: new Date(batchFile.timestamp),
		size: batch.size,
		progress: 0,
		errors: batchFile.errors
	};

	const job = batch as Job;
	return {
		filename: batch.filename,
		date: new Date(job.uploaded),
		size: batch.size,
		progress: job.progress
	};
}

export default function BatchDialog({ tomModel, batch, buttonType, stopShowing, ...props }: BatchDialogProps): JSX.Element {

	const unifiedBatch = getBatch(batch); // only for display puproses, not for upload to server

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [oneButtonError, setOneButtonError] = useState();

	function toggleDropdown() {
		setIsDropdownOpen(!isDropdownOpen);
	};

	function onButtonClick() {
		if (buttonType === DialogButtonType.Save) {
			console.log("upload batch to server");
		}
	}

	return (
		<OneButtonDialog
			{...props}
			onClick={onButtonClick}
			buttonType={buttonType}
			title="Batch Job:"
			stopShowing={stopShowing}
			error={oneButtonError}
			stopShowingError={() => setOneButtonError(undefined)}
		>
			<div className="p-4">
				<p><strong>File name: </strong>{unifiedBatch.filename}</p>
				<p><strong>Date uploaded: </strong> {unifiedBatch.date.toDateString()}</p>
				<p><strong>File size: </strong> {unifiedBatch.size} bytes</p>
				<p><strong>Current progress of job: </strong> {unifiedBatch.progress} %</p>
				{unifiedBatch.errors && unifiedBatch.errors.length > 0 && (
					<div className="mt-4">
						<button
							type="button"
							onClick={toggleDropdown}
							className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
						>
							{isDropdownOpen ? "Hide Errors" : "Show Errors"}
						</button>
						{isDropdownOpen && (
							<ul className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
								{unifiedBatch.errors.map((error, index) => (
									<li key={index} className="mb-2">
										<pre className="whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
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