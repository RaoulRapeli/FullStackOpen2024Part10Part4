import { RepositoryListContainer } from "../../../components/RepositoryList/RepositoryList";
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from "../../../components/SignIn";


describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };
            render(<RepositoryListContainer repositories={repositories} />);
            const repositoryItems = screen.getAllByTestId('repositoryItem');
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
            // screen.debug()
            const getValueInThousends = (value) => {
                return (value / 1000 >= 1 ? (`${(value / 1000).toFixed(1)}k`) : value)
            }

            expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.fullName)
            expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.description)
            expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.language)
            expect(firstRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[0].node.forksCount))
            expect(firstRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[0].node.stargazersCount))
            expect(firstRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[0].node.ratingAverage))
            expect(firstRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[0].node.reviewCount))
            expect(secondRepositoryItem).toHaveTextContent(repositories.edges[1].node.fullName)
            expect(secondRepositoryItem).toHaveTextContent(repositories.edges[1].node.description)
            expect(secondRepositoryItem).toHaveTextContent(repositories.edges[1].node.language)
            expect(secondRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[1].node.forksCount))
            expect(secondRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[1].node.stargazersCount))
            expect(secondRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[1].node.ratingAverage))
            expect(secondRepositoryItem).toHaveTextContent(getValueInThousends(repositories.edges[1].node.reviewCount))
        });
    });
});

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button
            const onSubmit = jest.fn();
            render(<SignIn onSubmit={onSubmit} />);
            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'RaoulRapeli');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'mypassword');
            fireEvent.press(screen.getByText('Sign in'));
            
            await waitFor(() => {
                // expect the onSubmit function to have been called once and with a correct first argument
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'RaoulRapeli',
                    password: 'mypassword',
                });
            });
        });
    });
});