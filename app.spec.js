import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const wrapper = ({ children }) => (
	<QueryClientProvider client={new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})}>
		{children}
	</QueryClientProvider>
);

const Example = () => {
	const myQuery1 = useQuery({ queryKey: ['q1'], queryFn: () => Promise.resolve(true) })
	const myQuery2 = useQuery({ queryKey: ['q2'], queryFn: () => Promise.resolve(true) });


	if (myQuery1.isLoading || myQuery2.isLoading) {
		return <div>Loading...</div>;
	}

	if (myQuery1.isError || myQuery2.isError) {
		return <div>Error!</div>;
	}

	return (
		<>
			{myQuery1.data && myQuery2.data && (
				<div>Render app</div>
			)}
		</>
	);
};

test('should render app', async () => {
	const result = render(<Example />, { wrapper });
	expect(
		await result.findByText(/Render app/i),
	).toBeInTheDocument();
});