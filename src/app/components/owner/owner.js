import React, { useEffect, useState } from 'react';
import ownerApi from '../../api/ownerApi';
import repoApi from '../../api/repoApi';

import { FixedSizeList as ListRepo } from 'react-window';

export function Owner({ owner, sortSelected }) {
    const [ownerData, setOwnerData] = useState({});
    const [repoData, setRepoData] = useState([]);

    useEffect(() => {
        getOwnerData(owner.username);
    }, []);

    useEffect(() => {
        if (!ownerData || Object.keys(ownerData).length === 0 || ownerData.type === 'NotFound') return
        getOwnerRepos(ownerData.login, ownerData.type);

    }, [ownerData]);

    useEffect(() => {
        if (Object.keys(sortSelected).length === 0) return;
        handleSort()
    }, [sortSelected])

    const getOwnerData = async (username) => {
        try {
            const result = await ownerApi.getOwner(username);
            setOwnerData(result);
        } catch (error) {
            const notFoundOwner = {
                login: username,
                type: 'NotFound',
            }
            setOwnerData(notFoundOwner);
            return null;
        }
    }


    const getOwnerRepos = async (username, type) => {
        try {
            if (type === 'User') {
                const result = await repoApi.getUserRepos(username);
                return setRepoData(result);
            }
            if (type === 'Organization') {
                const result = await repoApi.getOrgRepos(username);
                return setRepoData(result);
            }
        } catch (error) {
            return null;
        }
    }

    const handleSort = () => {
        let repoSortResult = JSON.parse(JSON.stringify(repoData))

        if (sortSelected.value === 'stars') {
            repoSortResult.sort((a, b) => b.stargazers_count - a.stargazers_count);
        }
        if (sortSelected.value === 'forks') {
            repoSortResult.sort((a, b) => b.stargazers_count - a.stargazers_count ||
                b.forks_count - a.forks_count ||
                b.watchers_count - a.watchers_count
            );
        }
        if (sortSelected.value === 'original') {
            repoSortResult.sort((a, b) => a.forks_count - b.forks_count ||
                b.stargazers_count - a.stargazers_count ||
                b.watchers_count - a.watchers_count
            );
        }

        setRepoData(repoSortResult);
    }

    const RepoItem = ({ data, index, style }) => {
        const repo = data[index];
        return (
            <div key={index} className='owner-data--repo' style={style}>
                <a href={repo.html_url} target='_blank' className='text-cyan-600 font-bold truncate w-full'>{repo.name}</a>
                <div className='owner-data--statistics text-[14px]'>
                    <div className='owner-data--repo-watchers flex items-center mr-2'>
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-eye mr-2">
                            <path fillRule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        Watchers
                        <span className='ml-1'>{repo.watchers_count}</span>
                    </div>
                    <div className='owner-data--repo-stars flex items-center mr-2'>
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-star d-inline-block mr-2">
                            <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        Stars
                        <span className='ml-1'>{repo.stargazers_count}</span>
                    </div>
                    <div className='owner-data--repo-forks flex items-center'>
                        <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo-forked mr-2">
                            <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                        </svg>
                        Fork
                        <span className='ml-1'>{repo.forks_count}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='owner'>
            <div className='owner-data'>
                {ownerData.type === 'NotFound' && <div className='owner-not-found'>
                    <div className='owner-data--username'>Sorry, Owner username {owner.username} Not Found !!!</div>
                </div>}
                {ownerData.type && ownerData.type !== 'NotFound' && <div className='owner-data--info shadow p-5 m-2 min-h-[255px]'>
                    <img className='owner-data--avatar max-w-[125px] rounded mx-auto' src={ownerData.avatar_url} alt={ownerData.login} />
                    <div className='owner-data--name text-center text-[24px] font-bold mx-2'>
                        <a href={ownerData.html_url} target='_blank'>{ownerData.name}</a>
                    </div>
                    <div className='text-center text-[12px]'>
                        <div className='owner-data--follower'>Follower: {ownerData.followers}</div>
                        <div className='owner-data--following'>Following: {ownerData.following}</div>
                        <div className='owner-data--public_repos'>Public_repos: {ownerData.public_repos}</div>
                    </div>
                </div>}
                {repoData.length > 0 && <div className='owner-data--repos shadow p-5 m-2 mt-[-10px] overflow-hidden'>
                    <ListRepo
                        className='owner-data--repos-list w-full'
                        height={350}
                        width={300}
                        itemData={repoData}
                        itemCount={repoData.length}
                        itemSize={100}>
                        {RepoItem}
                    </ListRepo>
                </div>}
            </div>
        </div>
    );
}

export default Owner;
