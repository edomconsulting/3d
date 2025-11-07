import React, { useState } from 'react';

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold text-brand-gray-600 dark:text-gray-100 border-b-2 border-brand-orange-light dark:border-brand-gray-500 pb-2 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {children}
        </div>
    </div>
);

const FormGroup: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`flex flex-col ${className}`}>
        <label className="mb-1 text-sm font-medium text-brand-gray-500 dark:text-brand-gray-300">{label}</label>
        {children}
    </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white"
    />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select
        {...props}
        className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white dark:bg-brand-gray-500 dark:text-white"
    />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea
        {...props}
        className="w-full px-3 py-2 border border-brand-gray-200 dark:border-brand-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-transparent dark:text-white h-24 resize-none"
    />
);


const PatientIntakeForm: React.FC<{ onCancel: () => void; }> = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        // Demographics
        fullName: '',
        dateOfBirth: '',
        gender: '',
        // Contact
        phone: '',
        email: '',
        address: '',
        // Medical History
        allergies: '',
        currentMedications: '',
        chronicIllnesses: '',
        pastSurgeries: '',
        // Insurance
        provider: '',
        policyNumber: '',
        groupNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Patient Intake Form Data:', formData);
        // Here you would typically send the data to a server
        alert('Patient data submitted! Check the console for the form data.');
        onCancel(); // Close modal on submit
    };

    return (
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-4 -mr-4">
            <FormSection title="Patient Demographics">
                <FormGroup label="Full Name" className="md:col-span-2">
                    <Input name="fullName" value={formData.fullName} onChange={handleChange} required />
                </FormGroup>
                <FormGroup label="Date of Birth">
                    <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </FormGroup>
                <FormGroup label="Gender">
                    <Select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled>Select gender...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </Select>
                </FormGroup>
            </FormSection>

            <FormSection title="Contact Information">
                <FormGroup label="Phone Number">
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </FormGroup>
                <FormGroup label="Email Address">
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </FormGroup>
                <FormGroup label="Full Address" className="md:col-span-2">
                    <Input name="address" value={formData.address} onChange={handleChange} required />
                </FormGroup>
            </FormSection>

            <FormSection title="Medical History">
                <FormGroup label="Allergies">
                    <Textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder="List any known allergies..." />
                </FormGroup>
                <FormGroup label="Current Medications">
                    <Textarea name="currentMedications" value={formData.currentMedications} onChange={handleChange} placeholder="List all current medications, including dosage and frequency..." />
                </FormGroup>
                <FormGroup label="Chronic Illnesses">
                    <Textarea name="chronicIllnesses" value={formData.chronicIllnesses} onChange={handleChange} placeholder="e.g., Diabetes, Hypertension, Asthma..." />
                </FormGroup>
                <FormGroup label="Past Surgeries">
                    <Textarea name="pastSurgeries" value={formData.pastSurgeries} onChange={handleChange} placeholder="List any significant past surgeries and their approximate dates..." />
                </FormGroup>
            </FormSection>
            
            <FormSection title="Insurance Details">
                <FormGroup label="Insurance Provider">
                    <Input name="provider" value={formData.provider} onChange={handleChange} required />
                </FormGroup>
                <FormGroup label="Policy Number">
                    <Input name="policyNumber" value={formData.policyNumber} onChange={handleChange} required />
                </FormGroup>
                <FormGroup label="Group Number">
                    <Input name="groupNumber" value={formData.groupNumber} onChange={handleChange} />
                </FormGroup>
            </FormSection>
            
            <div className="flex justify-end gap-4 pt-4 border-t dark:border-brand-gray-500 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg text-sm font-semibold text-brand-gray-500 dark:text-gray-300 bg-brand-gray-100 dark:bg-brand-gray-500 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-400 transition-colors">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-brand-orange hover:bg-opacity-90 transition-colors">
                    Save Patient
                </button>
            </div>
        </form>
    );
};

export default PatientIntakeForm;