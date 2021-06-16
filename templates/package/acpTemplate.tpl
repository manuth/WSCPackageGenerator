{include file='header' pageTitle='foo.bar.baz'}

<header class="contentHeader">
	<div class="contentHeaderTitle">
		<h1 class="contentTitle">Title</h1>
	</div>
	
	<nav class="contentHeaderNavigation">
		<ul>
			{* your default content header navigation buttons *}
			
			{event name='contentHeaderNavigation'}
		</ul>
	</nav>
</header>

{* content *}

{include file='footer'}
