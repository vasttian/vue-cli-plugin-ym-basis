# -*- coding: utf-8 -*-

from fabric.api import hosts, env
from fabric.context_managers import cd
from fabric.operations import local, put, run


def deploy(build, project_root):
    if build == 'prod':
        local('npm run build')
    elif build == 'test':
        local('npm run build-test')
    else:
        print("Please deploy in specific mode like test or production.")
        return

    with cd(project_root):
        run('mkdir deploy', quiet=True)
        put('dist', 'deploy')
        run('rm -rf dist_bak')
        run('mv dist dist_bak', quiet=True)
        run('rm -rf dist')
        run('mv deploy/dist dist')
        run('rm -rf deploy')


@hosts('ymweb@172.16.24.36')
def deploy_prod(build='prod'):
    """部署到生产环境

    # 发布前编译
    fab deploy_prod:build=prod
    fab deploy_prod:prod
    fab deploy_prod

    # 不编译
    fab deploy_prod:build=no
    fab deploy_prod:no
    """
    project_root = '/data/www/<%= rootOptions.projectName %>/'
    deploy(build, project_root)


@hosts('ymtest@172.16.24.42')
def deploy_test(build='test'):
    """部署到测试环境

    # 发布前编译
    fab deploy_test:build=test
    fab deploy_test:test
    fab deploy_test

    # 不编译
    fab deploy_test:build=no
    fab deploy_test:no
    """
    project_root = '/data/www/<%= rootOptions.projectName %>/'
    deploy(build, project_root)
